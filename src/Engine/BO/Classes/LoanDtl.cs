using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Engine.BO;
public class LoanDtl : BaseBO
{
    // public Loan Loan { get; set; }
    public int Id { get; set; }
    public Item? Item { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set;}
}
