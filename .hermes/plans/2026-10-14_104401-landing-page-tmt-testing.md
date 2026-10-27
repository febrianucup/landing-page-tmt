# Rencana Implementasi: Penambahan Unit Testing (Vitest) untuk landing-page-tmt

## Goal
Menambahkan framework pengujian otomatis (Vitest dan React Testing Library) ke dalam proyek React + Vite `landing-page-tmt` untuk memastikan keandalan autentikasi demo, state `localStorage`, dan komponen dashboard.

## Current context / assumptions
- Proyek berlokasi di `/media/febrian/Local Disk/web/landing-page-tmt`.
- Teknologi: React 19, Vite, Tailwind CSS v4, React Router 7, dengan data tersimpan di `localStorage`.
- Saat ini belum ada pengujian otomatis (`package.json` tidak memiliki dependensi pengujian atau skrip `test`).

## Architecture / proposed approach
- Menggunakan **Vitest** sebagai test runner yang terintegrasi mulus dengan Vite.
- Menggunakan **React Testing Library** (@testing-library/react) untuk menguji komponen UI (Login, Dashboard, dll.).
- Menggunakan **jsdom** sebagai lingkungan DOM virtual untuk pengujian berbasis React.
- Menempatkan file tes di dalam folder `src/__tests__/` atau sejajar dengan modul terkait.

## Step-by-step tasks

### Task 1: Install Dependensi Pengujian
- **File**: `package.json`
- **Deskripsi**: Menambahkan `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, dan `@types/jest` sebagai `devDependencies`.
- **Perintah**:
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  ```
- **Verifikasi**: Periksa `package.json` untuk memastikan paket terdaftar di `devDependencies`.

### Task 2: Konfigurasi Vitest
- **File**: `vitest.config.js` (buat baru di root proyek)
- **Deskripsi**: Membuat file konfigurasi Vitest agar mengenali lingkungan DOM (jsdom) dan file setup pengujian.
- **Kode**:
  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/__tests__/setup.js',
    },
  });
  ```
- **File setup**: `src/__tests__/setup.js`
  ```js
  import '@testing-library/jest-dom';
  ```
- **Verifikasi**: Jalankan `npx vitest --run` untuk memastikan konfigurasi berjalan tanpa error.

### Task 3: Menulis Unit Test untuk Autentikasi Demo (`demoAccount.js`)
- **File**: `src/lib/__tests__/demoAccount.test.js`
- **Deskripsi**: Menguji fungsi kredensial demo untuk memastikan email dan password admin sesuai spesifikasi.
- **Kode**:
  ```js
  import { describe, it, expect } from 'vitest';
  import { DEMO_EMAIL, DEMO_PASSWORD } from '../demoAccount';

  describe('Demo Account Config', () => {
    it('should have correct demo credentials', () => {
      expect(DEMO_EMAIL).toBe('admin@tmt.id');
      expect(DEMO_PASSWORD).toBe('admin123');
    });
  });
  ```
- **Verifikasi & TDD**: Jalankan `npx vitest run src/lib/__tests__/demoAccount.test.js` dan pastikan tes lulus.
  - **Expected Output**: `1 passed`

### Task 4: Menulis Tes Komponen untuk Halaman Login (`Login.jsx`)
- **File**: `src/pages/__tests__/Login.test.jsx`
- **Deskripsi**: Menguji render halaman login serta fungsi tombol "Isi otomatis".
- **Kode**:
  ```js
  import { describe, it, expect, vi } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import { BrowserRouter } from 'react-router-dom';
  import Login from '../Login';
  import { AuthProvider } from '../../context/AuthContext';

  describe('Login Page', () => {
    it('renders login form and autofills demo credentials', () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </BrowserRouter>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/kata sandi/i);
      const autoFillBtn = screen.getByRole('button', { name: /isi otomatis/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      fireEvent.click(autoFillBtn);

      expect(emailInput.value).toBe('admin@tmt.id');
      expect(passwordInput.value).toBe('admin123');
    });
  });
  ```
- **Verifikasi & TDD**: Jalankan `npx vitest run src/pages/__tests__/Login.test.jsx`.
  - **Expected Output**: `1 passed`

### Task 5: Integrasi Skrip Test ke `package.json`
- **File**: `package.json`
- **Deskripsi**: Menambahkan skrip uji ke `package.json` agar mudah dijalankan via `npm test`.
- **Patch (di dalam `scripts`)**:
  ```json
  "test": "vitest run",
  "test:ui": "vitest --ui"
  ```
- **Verifikasi**: Jalankan `npm test` dan pastikan seluruh rangkaian tes berhasil.

## Tests / validation
- Ikuti siklus TDD per task:
  1. Tulis file tes baru (RED).
  2. Jalankan `npm test` untuk memastikan tes gagal karena belum diimplementasikan / dikonfigurasi.
  3. Lakukan implementasi / perbaikan kode (GREEN).
  4. Jalankan `npm test` untuk memverifikasi seluruh tes lulus.

## Risks, tradeoffs, and open questions
- **Kompatibilitas React 19**: React Testing Library mungkin memerlukan flag `--legacy-peer-deps` jika ada konflik versi peer dependency React 19. Jika terjadi, gunakan opsi tersebut saat instalasi.
- **LocalStorage mocking**: Beberapa komponen mungkin memerlukan mock `localStorage` jika mengakses storage saat direktori/konteks dimuat.
