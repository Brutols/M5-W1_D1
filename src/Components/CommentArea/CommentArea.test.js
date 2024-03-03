import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentArea from './CommentArea'; // Make sure the path is correct

// Make sure to mock react-redux at the beginning of the test file
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('CommentArea', () => {
    beforeEach(() => {
        // Reset and configure mocks
        useDispatch.mockReturnValue(jest.fn()); // Configure the useDispatch mock here

        useSelector.mockImplementation((selector) => {
            // Here we mock the state returned by useSelector
            switch (selector.name) {
                case 'allComments':
                    return []; // Assume the component expects an empty array of comments by default
                case 'isCommentRefreshed':
                    return false; // Default state for isCommentRefreshed
                case 'isAllCommentsError':
                    return null; // No default error
                case 'isDarkModeActive':
                    return false; // Default dark mode not active
                case 'allFormData':
                    // Here we provide a mock for formData based on the structure of the provided slice
                    return {
                        rating: 0,
                        inputValue: "",
                        isEditing: false,
                        commentId: "",
                    };
                default:
                    return undefined;
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clean up mocks after each test
    });

    test('renders correctly with provided props and displays comments', async () => {
        const props = {
            onHide: jest.fn(),
            title: 'Test Title',
            asin: '123',
            show: true,
        };

        const { getByTestId, queryByText } = render(<CommentArea {...props} />);

        expect(screen.getByText(props.title)).toBeInTheDocument();
        
        //simulate user click on close button
        const modal = queryByText(props.title)
        
        waitForElementToBeRemoved(modal)

        act(() => {
            const closeBtn = getByTestId("close-btn")
            fireEvent.click(closeBtn)
        })

    });
});