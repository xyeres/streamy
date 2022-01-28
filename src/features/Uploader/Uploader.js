import UploaderListItem from './UploaderListItem'


export default function Uploader({ files, path }) {
  return (
    <ul className="p-6 divide-y w-full">
      {files.length > 0 && files.map((file) => {
        return <UploaderListItem key={file.name} path={path} file={file} />
      })}
    </ul>
  )
}
