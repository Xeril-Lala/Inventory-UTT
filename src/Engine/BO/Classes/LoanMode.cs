﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO;
public class LoanMode : BaseBO
{
    public string? Code { get; set; }
    public string? Unit { get; set; }
    public double Duration { get; set; }
}

