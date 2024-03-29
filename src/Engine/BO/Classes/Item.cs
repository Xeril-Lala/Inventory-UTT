﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Engine.BO
{
    public class Item : BaseBO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? CustomId { get; set; }
        public string? Description { get; set; }
        public DateTime? Acquisition { get; set; }
        public Asset? Model { get; set; }
        public Asset? Location { get; set; }
        public string? Serial { get; set; }
        public string? Condition { get; set; }
        public bool? IsUsed { get; set; }
    }
}
