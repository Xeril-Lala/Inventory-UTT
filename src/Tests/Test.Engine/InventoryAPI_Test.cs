using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Test.Engine
{
    [TestClass]
    public class InventoryAPI_Test
    {
        private static string Url { 
            get {
                string url = string.Empty;

                if (TestUtils.Settings != null)
                {
                    var api = TestUtils.Settings["urlApi"];
                    url = api?.ToString() ?? string.Empty;
                }

                return url;
            } 
        }

        private static HttpClient Client { 
            get {
                var client = new HttpClient
                {
                    BaseAddress = new Uri(Url)
                };

                return client;
            }
        }

        public void GetToken()
        {
            var client = Client;

            //var res = await client.PostAsync(
            //    "/api/Security/Token",
            //    JsonContent.Create(new { })
            //);
        }
    }
}
