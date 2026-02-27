import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginDonantePage from '@/app/registro/donante/page';
import { useAuth } from '@/contextos/AuthContext';
import { useRouter } from 'next/navigation';

// Mock de hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/contextos/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginDonantePage', () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    // Resetear mocks antes de cada prueba
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  /**
   * PRUEBA 1: Integridad Visual
   * Verificamos que los elementos esenciales (inputs y botón) existen en el DOM.
   * Si esto falla, el usuario ni siquiera podría intentar loguearse.
   */
  it('Debe mostrar el formulario de login (Inputs y Botón)', () => {
    render(<LoginDonantePage />);

    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  /**
   * PRUEBA 2: Interactividad
   * Comprobamos que los campos de texto no están bloqueados y aceptan entrada del usuario.
   * Es fundamental para asegurar que el estado de React se actualiza correctamente.
   */
  it('Debe permitir escribir en los campos de Email y Contraseña', () => {
    render(<LoginDonantePage />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  /**
   * PRUEBA 3: Flujo de Éxito
   * Simulamos un login correcto y verificamos:
   * 1. Que se llame a la función `login` con los datos correctos.
   * 2. Que se redirija al usuario a la página de inicio ('/').
   */
  it('Debe llamar a login() con los datos correctos y redirigir al Home', async () => {
    mockLogin.mockResolvedValueOnce({}); // Simular login exitoso

    render(<LoginDonantePage />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  /**
   * PRUEBA 4: Manejo de Errores
   * Simulamos un error del servidor (ej. contraseña incorrecta) y verificamos:
   * 1. Que el mensaje de error se muestre al usuario en pantalla.
   * 2. Que NO se redirija a ninguna otra página.
   */
  it('Debe mostrar mensaje de error si el login falla (NO redirige)', async () => {
    const errorMessage = 'Credenciales inválidas';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage)); // Simular fallo

    render(<LoginDonantePage />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
