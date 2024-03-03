import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { useDispatch, useSelector } from 'react-redux';
import TopNav from './Nav'; // Make sure the path is correct

// Mock useSelector and useDispatch from react-redux
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('TopNav', () => {
    // Set up mocks for useSelector and useDispatch before each test
    beforeEach(() => {
        // Mock useSelector to return false for isDarkMode and true for isVisible
        useSelector.mockImplementation((selector) => {
            if (selector.name === 'isDarkModeActive') {
                return false;
            } else if (selector.name === 'isNavVisible') {
                return true; // Assuming you want the input to be visible
            }
            return undefined;
        });

        // Mock useDispatch to return an empty function
        useDispatch.mockReturnValue(() => { });
    });

    // Clean up mocks after each test
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders the search input and responds to user input', () => {
        // Wrap TopNav in MemoryRouter to provide router context
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        );

        // Find the search input and verify that it's rendered
        const searchInput = screen.getByPlaceholderText('Search Books...');
        expect(searchInput).toBeInTheDocument();

        // Simulate user input
        userEvent.type(searchInput, 'Harry Potter');

        // Verify that the search input contains the entered value
        expect(searchInput.value).toBe('Harry Potter');
    });

    // You can add more tests here if needed
});