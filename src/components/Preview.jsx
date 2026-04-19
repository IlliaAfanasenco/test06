const Preview = ({html}) => {
    if (!html) {
        return <div>Preview is empty</div>
    }
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    );
};

export default Preview;