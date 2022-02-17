import UploaderListItem from './UploaderListItem'


export default function UploaderList({ files }) {
  return (
    <ul className="p-6 divide-y w-full">
      {files.length > 0 && files.map((file) => {
        return <UploaderListItem key={file.name} file={file} />
      })}
    </ul>
  )
}
