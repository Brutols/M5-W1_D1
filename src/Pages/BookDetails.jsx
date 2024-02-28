import React, { useEffect } from 'react'
import MainLayout from '../Layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { allBooks } from '../Reducers/books/booksSlice'
import { useParams } from 'react-router-dom'
import Details from '../Components/Details/Details'
import { getComments, isCommentRefreshed } from '../Reducers/comments/commentsSlice'
import CommentList from '../Components/CommentList/CommentList'
import AddComment from '../Components/AddComment/AddComment'

const BookDetails = () => {
    const {id} = useParams()
    const books = useSelector(allBooks)
    const commentRefresh = useSelector(isCommentRefreshed)

    const bookDetails = books.find((book) => book.asin === id)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getComments(id))
    }, [commentRefresh, dispatch, id]);

  return (
    <MainLayout>
        <Details title={bookDetails.title} img={bookDetails.img} desc={bookDetails.category} price={bookDetails.price}>
            <AddComment asin={id}/>
            <CommentList isDetails={true}/>
        </Details>
    </MainLayout>
  )
}

export default BookDetails