using System;

namespace TestConsoleMyDevelop.SQL
{
    class CreateSQL
    {
        /// <summary>
        /// コメント繰り返し作成
        /// </summary>
        public void createProperty()
        {
            for (int i = 1; i < 136; i++)
            {
                Console.WriteLine("// <summary>\n" +
                                  $"/// 数量{i}\n" +
                                  "/// <summary>\n" +
                                  $"public decimal? qty{i} " +
                                  "{ get; set; }"
                                   );
            }
        }



    }
}
