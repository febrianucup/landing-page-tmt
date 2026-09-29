export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadJson(filename, data) {
  downloadBlob(filename, new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
}

export function downloadText(filename, text, mime = 'text/plain') {
  downloadBlob(filename, new Blob([text], { type: `${mime};charset=utf-8` }))
}

const csvCell = (value) => {
  const text = value === undefined || value === null ? '' : String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows, columns) {
  const header = columns.map((column) => csvCell(column.label)).join(',')
  const body = rows
    .map((row) => columns.map((column) => csvCell(typeof column.value === 'function' ? column.value(row) : row[column.value])).join(','))
    .join('\n')
  return `${header}\n${body}\n`
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('File tidak dapat dibaca.'))
    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result || '')))
      } catch {
        reject(new Error('File bukan JSON yang valid.'))
      }
    }
    reader.readAsText(file)
  })
}
