export default function MainNotes({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1 flex-col gap-4 w-full items-center">
            {children}
        </div>
    );
}
