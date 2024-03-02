interface Comment {
    id: string,
    userId: string,
    text: string,
    time: string,
    likes: Array<string>
}

export default Comment;