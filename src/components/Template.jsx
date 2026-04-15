import {useTemplate} from "../hooks/templates/useTemplate.js";


const Template = () => {
    const {templateId, content, setContent, variables, preview, loading, error, saveTemplate} = useTemplate()


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['clean']
        ]
    }

    if(loading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }

    return (
        <div>
        <div>
            {error ? (
                <div>{error}</div>
            ) : null}

            <div>
                ti = {templateId}
            </div>

            <textarea onChange={(e) => setContent(e.target.value)}
                      value={content} >
            </textarea>

        </div>

         <div>
             {variables?.map((item) => (
                 <button key={item}>{item}</button>
             ))}
         </div>

            <div>
                <button onClick={saveTemplate}></button>
            </div>

            <div>
                {preview}
            </div>
        </div>
    );
};

export default Template;