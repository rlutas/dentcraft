'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send, Upload, X, FileText, Image as ImageIcon, File } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState, useRef } from 'react'

type FormData = {
  email: string
  gdprConsent: boolean
  message: string
  name: string
  phone: string
  subject: string
}

type FormErrors = {
  [K in keyof FormData]?: string
} & {
  files?: string
}

type UploadedFile = {
  file: File
  id: string
  preview?: string
}

const initialFormData: FormData = {
  email: '',
  gdprConsent: false,
  message: '',
  name: '',
  phone: '',
  subject: '',
}

// Allowed file types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES = 5

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon
  if (type === 'application/pdf') return FileText
  return File
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function ContactForm() {
  const t = useTranslations('contactForm')
  const tCommon = useTranslations('common')

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const subjectOptions = [
    { label: t('subjects.consultation'), value: 'consultation' },
    { label: t('subjects.appointment'), value: 'appointment' },
    { label: t('subjects.pricing'), value: 'pricing' },
    { label: t('subjects.other'), value: 'other' },
  ]

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameTooShort')
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid')
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim() && !/^[0-9+\s()-]{6,20}$/.test(formData.phone)) {
      newErrors.phone = t('errors.phoneInvalid')
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = t('errors.subjectRequired')
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('errors.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageTooShort')
    }

    // GDPR consent validation
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = t('errors.gdprRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, t])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))

      // Clear error for this field when user starts typing
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }))
      }
    },
    [errors]
  )

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = []
    const fileErrors: string[] = []

    Array.from(files).forEach((file) => {
      // Check total files limit
      if (uploadedFiles.length + newFiles.length >= MAX_FILES) {
        fileErrors.push(`Maximum ${MAX_FILES} files allowed`)
        return
      }

      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name}: Invalid file type`)
        return
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name}: File too large (max 10MB)`)
        return
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file)
      }

      newFiles.push(uploadedFile)
    })

    if (fileErrors.length > 0 && fileErrors[0]) {
      const errorMessage = fileErrors[0]
      setErrors((prev) => {
        const newErrors = { ...prev }
        newErrors.files = errorMessage
        return newErrors
      })
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.files
        return newErrors
      })
    }

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [uploadedFiles.length])

  const removeFile = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitStatus('idle')

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      try {
        // Create FormData for file upload
        const submitData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          submitData.append(key, String(value))
        })

        uploadedFiles.forEach((uploadedFile) => {
          submitData.append('files', uploadedFile.file)
        })

        const response = await fetch('/api/contact', {
          body: submitData,
          method: 'POST',
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        setSubmitStatus('success')
        setFormData(initialFormData)

        // Cleanup file previews
        uploadedFiles.forEach((file) => {
          if (file.preview) URL.revokeObjectURL(file.preview)
        })
        setUploadedFiles([])
      } catch {
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, uploadedFiles, validateForm]
  )

  // Input styling
  const inputBaseClass = 'w-full px-4 py-3.5 rounded-xl border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0'
  const inputNormalClass = `${inputBaseClass} border-[#e8e3db] hover:border-[#d4c4b0] focus:border-[#1a1a1a] focus:ring-[#1a1a1a]/10`
  const inputErrorClass = `${inputBaseClass} border-red-400 focus:border-red-500 focus:ring-red-500/20`

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Success Message */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-800">{t('successMessage')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-800">{t('errorMessage')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two-column layout for name and email on desktop */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]" htmlFor="name">
            {t('name')} <span className="text-red-500">*</span>
          </label>
          <input
            className={errors.name ? inputErrorClass : inputNormalClass}
            id="name"
            name="name"
            onChange={handleChange}
            placeholder={t('namePlaceholder')}
            type="text"
            value={formData.name}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]" htmlFor="email">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            className={errors.email ? inputErrorClass : inputNormalClass}
            id="email"
            name="email"
            onChange={handleChange}
            placeholder={t('emailPlaceholder')}
            type="email"
            value={formData.email}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Two-column layout for phone and subject */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Phone Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]" htmlFor="phone">
            {t('phone')}
          </label>
          <input
            className={errors.phone ? inputErrorClass : inputNormalClass}
            id="phone"
            name="phone"
            onChange={handleChange}
            placeholder={t('phonePlaceholder')}
            type="tel"
            value={formData.phone}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Subject Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]" htmlFor="subject">
            {t('subject')} <span className="text-red-500">*</span>
          </label>
          <select
            className={errors.subject ? inputErrorClass : inputNormalClass}
            id="subject"
            name="subject"
            onChange={handleChange}
            value={formData.subject}
          >
            <option value="">{t('subjectPlaceholder')}</option>
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]" htmlFor="message">
          {t('message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`${errors.message ? inputErrorClass : inputNormalClass} resize-none`}
          id="message"
          name="message"
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          rows={5}
          value={formData.message}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#1a1a1a]">
          {t('attachments') || 'Attachments'}
          <span className="ml-1 font-normal text-[#6b6b6b]">({t('optional') || 'optional'})</span>
        </label>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200
            ${isDragging
              ? 'border-[#1a1a1a] bg-[#f5f0e8]'
              : 'border-[#e8e3db] bg-[#faf8f5] hover:border-[#d4c4b0] hover:bg-[#f5f0e8]'
            }
            ${errors.files ? 'border-red-300 bg-red-50' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(',')}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2">
            <div className={`
              flex h-12 w-12 items-center justify-center rounded-xl transition-colors
              ${isDragging ? 'bg-[#1a1a1a] text-white' : 'bg-[#e8ded0] text-[#1a1a1a]'}
            `}>
              <Upload className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {t('dragDropFiles') || 'Drag and drop files here'}
              </p>
              <p className="mt-1 text-xs text-[#6b6b6b]">
                {t('fileTypesAllowed') || 'PNG, JPG, PDF, DOC up to 10MB'}
              </p>
            </div>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errors.files && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.files}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Uploaded Files List */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              {uploadedFiles.map((uploadedFile) => {
                const FileIcon = getFileIcon(uploadedFile.file.type)
                return (
                  <motion.div
                    key={uploadedFile.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="group flex items-center gap-3 rounded-lg border border-[#e8e3db] bg-white p-3"
                  >
                    {/* Preview or Icon */}
                    {uploadedFile.preview ? (
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f0e8]">
                        <FileIcon className="h-5 w-5 text-[#6b6b6b]" strokeWidth={1.5} />
                      </div>
                    )}

                    {/* File info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1a1a1a]">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-[#6b6b6b]">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(uploadedFile.id)
                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6b6b6b] opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GDPR Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5">
            <input
              checked={formData.gdprConsent}
              className="peer sr-only"
              name="gdprConsent"
              onChange={handleChange}
              type="checkbox"
            />
            <div className={`
              h-5 w-5 rounded-md border-2 transition-all duration-200
              peer-checked:border-[#1a1a1a] peer-checked:bg-[#1a1a1a]
              ${errors.gdprConsent ? 'border-red-400' : 'border-[#d4c4b0]'}
            `}>
              <svg
                className="h-full w-full text-white opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <svg
              className={`absolute left-0 top-0 h-5 w-5 text-white transition-opacity ${formData.gdprConsent ? 'opacity-100' : 'opacity-0'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-[#6b6b6b]">
            {t('gdprConsent')} <span className="text-red-500">*</span>
          </span>
        </label>
        <AnimatePresence>
          {errors.gdprConsent && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1.5 text-sm text-red-500"
            >
              {errors.gdprConsent}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.button
        className={`
          flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300
          ${isSubmitting
            ? 'cursor-not-allowed bg-[#6b6b6b] text-white'
            : 'bg-[#1a1a1a] text-white shadow-lg shadow-[#1a1a1a]/20 hover:-translate-y-0.5 hover:bg-[#333333] hover:shadow-xl hover:shadow-[#1a1a1a]/25 active:translate-y-0'
          }
        `}
        disabled={isSubmitting}
        type="submit"
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" strokeWidth={1.5} />
            {tCommon('submit')}
          </>
        )}
      </motion.button>
    </form>
  )
}
