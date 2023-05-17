using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Engine.BO
{
    public class Asset : BaseBO
    {
        public string? Code { get; set; }
        public string? Value { get; set; }
        public string? Key1 { get; set; }
        public string? Key2 { get; set; }
        public string? Key3 { get; set; }
        public string? Desc1 { get; set; }
        public string? Desc2 { get; set; }
        public string? Desc3 { get; set; }
        public byte[] Data { get; set; }
    }
}
