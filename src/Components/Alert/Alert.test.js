// setupTests.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Alert from './Alert';

// Jest's fake timers ti permette di controllare il passaggio del tempo
jest.useFakeTimers();

describe('MyAlert component', () => {
    test('renders the welcome message', () => {
        render(<Alert />);
        expect(screen.getByText('Welcome to EpiBooks!')).toBeInTheDocument();
    });

    test('renders the custom text when noTimeOut is true', () => {
        const customText = 'Custom welcome message';
        render(<Alert noTimeOut={true} text={customText} />);
        expect(screen.getByText(customText)).toBeInTheDocument();
    });

    test('clears the welcome message after 3 seconds', async () => {
        render(<Alert />);
        expect(screen.getByText('Welcome to EpiBooks!')).toBeInTheDocument();

        // Avvolge l'operazione che causa l'aggiornamento di stato in act() e usa timer falsi
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Aspetta e verifica che il messaggio sia sparito
        await waitFor(() => {
            expect(screen.queryByText('Welcome to EpiBooks!')).not.toBeInTheDocument();
        });
    });

});

