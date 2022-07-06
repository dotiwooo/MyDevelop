using System;
using System.IO;

namespace TestConsoleMyDevelop.TEXT
{
    class ReadText
    {
        const string filePath = @"..\..\..\TEXT\";
        const string fileName01 = "readText01.txt";

        /// <summary>
        /// テキストを読み込み、csvで分割して一番最初の行だけを読み取る
        /// </summary>
        public static void textRead_first()
        {

            var sr = new StreamReader(filePath + fileName01);

            var a = "";
            while ((a = sr.ReadLine()) != null)
            {
                var array = a.Split(" ");
                Console.WriteLine(array[0]);

            }

            Console.WriteLine("PG END.");
            Console.ReadKey();
        }

        /// <summary>
        /// テキストを読み込み、1行ごとのバイト数を算出する
        /// </summary>
        public void checkByte()
        {
            var sr = new StreamReader(filePath + fileName01);

            var a = "";
            while ((a = sr.ReadLine()) != null)
            {
                var byteValue = System.Text.Encoding.GetEncoding("UTF-8").GetByteCount(a);

                Console.WriteLine(byteValue);
            }

            Console.WriteLine("PG END.");
            Console.ReadKey();
        }
    }
}