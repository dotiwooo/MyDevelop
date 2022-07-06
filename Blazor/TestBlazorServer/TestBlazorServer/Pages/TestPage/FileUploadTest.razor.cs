using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TestBlazorServer.Data.TestPage.FileUploadTest;

namespace TestBlazorServer.Pages.TestPage
{
    public partial class FileUploadTest
    {
        private List<UpLoadFile> uploadFiles = new List<UpLoadFile>();
        private EnumUploadState uploadState = EnumUploadState.Waiting;

        /// <summary>
        /// ファイル選択時のイベントハンドラ
        /// </summary>
        private async Task OnInputFileChange(InputFileChangeEventArgs e)
        {
            uploadState = EnumUploadState.Loading;

            // GetMultipleFilesで取り込めるファイル数はデフォルトで10件と少ないため、100件に拡張している
            foreach (var file in e.GetMultipleFiles(100))
            {
                var ms = new MemoryStream();

                try
                {
                    // 1ファイル5MBまで
                    //await file.OpenReadStream(5000000).CopyToAsync(ms);
                    await file.OpenReadStream(50000000000).CopyToAsync(ms);

                }
                catch (Exception ex)
                {
                    var ee = ex;
                }

                var uploadModel = new UpLoadFile()
                {
                    FileName = file.Name,
                    FileStream = ms,
                };

                uploadFiles.Add(uploadModel);
            }

            uploadState = EnumUploadState.Waiting;
        }
    }
}
