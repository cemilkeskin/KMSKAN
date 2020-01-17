using System; 
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace Hello {
    class Program { 
        static void Main(string[] args) { 
            string html=string.Empty;
            string url=@"http://localhost:3001/api/getPaintings";

            HttpWebRequest request=(HttpWebRequest)WebRequest.Create(url); 
            request.AutomaticDecompression=DecompressionMethods.GZip; 

            using (HttpWebResponse response=(HttpWebResponse)request.GetResponse()) using (Stream stream=response.GetResponseStream()) using (StreamReader reader=new StreamReader(stream)) {
                html=reader.ReadToEnd();
            }  

            Console.WriteLine(html);
        }
    }
} 