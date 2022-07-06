using System.IO;

namespace TestBlazorServer.Data.TestPage.FileUploadTest
{
    public class UpLoadFile
    {
        public string FileName { get; set; } = null!;
        public Stream FileStream { get; set; } = null!;
    }
}
