import React, { ChangeEvent, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function AdvanceDemo() {
  // const uploader = useRef<FileUpload>(null);
  // // uploader.current?.getFiles();
  // console.log(uploader.current?.());
  return (
    <div className='card'>
      <FileUpload
        // ref={uploader}
        name='file'
        url={'/apply'}
        accept='application/pdf'
        onUpload={(e) => {
          console.log('onUpload', e);
        }}
        maxFileSize={1000000}
        emptyTemplate={
          <p className='m-0'>Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
}
