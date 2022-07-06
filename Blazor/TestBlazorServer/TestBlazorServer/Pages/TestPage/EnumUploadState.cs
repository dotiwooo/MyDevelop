using System.ComponentModel;

namespace TestBlazorServer.Pages.TestPage
{
    /// <summary>
    /// アップロードの状態
    /// </summary>
    public enum EnumUploadState
    {
        /// <summary>
        /// 待機中
        /// </summary>
        [Description("待機中")]
        Waiting = 0,
        /// <summary>
        /// ローディング中
        /// </summary>
        [Description("ローディング中")]
        Loading = 1,
        /// <summary>
        /// ファイルロード済
        /// </summary>
        [Description("ファイルロード済")]
        Loaded = 2,
        /// <summary>
        /// ファイル取込済
        /// </summary>
        [Description("ファイル取込済")]
        Uploaded = 3,
    }
}