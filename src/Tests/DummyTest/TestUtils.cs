﻿using System;
using System.IO;
using System.Data;
using Engine.BL;
using Engine.BO;
using System.Text.Json;
using System.Configuration;
using System.Text.Json.Nodes;
using Engine.Services;
using Engine.DAL;
using Engine.Constants;
using Org.BouncyCastle.Crypto.Generators;
using System.Reflection.Metadata;

namespace Test
{
    public static class TestUtils
    {
        private static JsonNode? _settings;
        public static JsonNode? Settings 
        {
            get { 
                if (_settings == null)
                {
                    _settings = GetSettings();
                }

                return _settings;
            }
        }

        private static JsonNode? GetSettings()
        {
            string file = File.ReadAllText("settings.json");
            return JsonNode.Parse(file);
        }

        public static string GetConn()
        {
            var config = Settings;
            string? conn = string.Empty;

            if (config != null)
            {
                conn = config["conn"]?.ToString();
            }

            return conn ?? string.Empty;
        }

        public static JsonNode? GetSecretSettings() => Settings?["secret"];

        public static bool IsSuccess(Result? result)
        {
            bool isSuccess = false;

            if(result != null && result.Status == C.OK)
                isSuccess = true;

            return isSuccess;
        }

        public static string GetTestingUser() => GetSecretEnv("user_env");

        public static string GetTestingPass() => GetSecretEnv("pass_env");

        private static string GetSecretEnv(string secretSetting)
        {
            string value = string.Empty;

            var key = GetSecretSettings()?[secretSetting];

            if (key != null)
            {
                // user = Environment.GetEnvironmentVariable(key.ToString()) ?? string.Empty;
                value = key.ToString();
            }

            return value;
        }

    }
}