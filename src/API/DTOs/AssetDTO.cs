﻿using BaseAPI.Classes;
using Engine.BO;
using System.Text.Json.Serialization;

namespace InventoryAPI.DTOs
{
    public class AssetDTO : BaseDTO<Asset>
    {
        public string? Code { get; set; }
        public string? Value { get; set; }
        public string? Group { get; set; }
        public string? SubGroup { get; set; }
        public string? AlternativeGroup { get; set; }
        public List<string>? Description { get; set; }

        [JsonIgnore]
        public string? MediaLink { get; set; }

        public AssetDTO() : base()
        { }

        public AssetDTO(Asset? obj) : base(obj)
        { }

        public override Asset Convert()
        {
            string? desc1 = null, desc2 = null, desc3 = null;

            if(Description != null && Description.Count() > 0)
            {
                desc1 = Description.ElementAtOrDefault(0);
                desc2 = Description.ElementAtOrDefault(1);
                desc3 = Description.ElementAtOrDefault(2);
            }

            var model = new Asset()
            {
                Code = Code,
                Value = Value,
                Key1 = Group,
                Key2 = SubGroup,
                Key3 = AlternativeGroup,
                Desc1 = desc1,
                Desc2 = desc2,
                Desc3 = desc3,
            };

            ConvertBaseBO(model, this);

            return model;
        }

        public override void Map(Asset obj)
        {
            List<string> description = new ();

            AddDescription(obj.Desc1, description);
            AddDescription(obj.Desc2, description);
            AddDescription(obj.Desc3, description);

            Code = obj.Code;
            Value = obj.Value;
            Description = description;
            Group = obj.Key1;
            SubGroup = obj.Key2;
            AlternativeGroup = obj.Key3;
            // TODO: Media Link
            MediaLink = string.Empty;

            MapBaseBO(this, obj);
        }

        static private void AddDescription(string? rawDesc, List<string> description)
        {
            if (!string.IsNullOrEmpty(rawDesc) && description != null)
                description.Add(rawDesc);
        }
    }
}