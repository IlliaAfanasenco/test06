const Preview = ({ html }) => {
    if (!html) {
        return (
            <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-400">
                preview is empty
            </div>
        );
    }

    return (
        <div className="text-sm leading-6 text-slate-800">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default Preview;