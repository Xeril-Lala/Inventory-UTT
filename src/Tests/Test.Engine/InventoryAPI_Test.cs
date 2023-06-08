using Engine.BO;
using Engine.Constants;
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

        [TestMethod]
        public async Task Test_0LoginAuth()
        {
            bool isSuccess = false;
            string msg = C.OK;

            var result = await GetToken();

            if (result?.Status == C.OK)
            {
                isSuccess = result?.Data?.ToString() != C.NOT_AUTH;
            }
            else msg = result?.Data?.ToString() ?? C.ERROR;

            Assert.IsTrue(isSuccess, msg);
        }

        private async Task<Result?> GetToken()
        {
            var client = Client;

            var content = JsonContent.Create(new { 
                user = TestUtils.GetTestingUser(),
                password = TestUtils.GetTestingPass()
            });

            var res = await client.PostAsync(
                "/api/Security/login",
                content
            );

            return await res.Content.ReadFromJsonAsync<Result>();
        }
    }
}
