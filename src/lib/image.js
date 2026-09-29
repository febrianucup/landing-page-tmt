/**
 * Reads a File and returns a resized JPEG data URL so uploaded images stay
 * small enough for localStorage.
 */
export function fileToDataUrl(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('File tidak dapat dibaca.'))
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      const image = new Image()

      image.onerror = () => reject(new Error('File bukan gambar yang didukung.'))
      image.onload = () => {
        const scale = Math.min(1, maxWidth / (image.width || maxWidth))
        const width = Math.max(1, Math.round((image.width || maxWidth) * scale))
        const height = Math.max(1, Math.round((image.height || width) * scale))

        if (scale === 1 && dataUrl.length < 400_000) {
          resolve(dataUrl)
          return
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }

      image.src = dataUrl
    }

    reader.readAsDataURL(file)
  })
}

export function prettyBytes(chars) {
  const bytes = Math.round((chars * 3) / 4)
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
