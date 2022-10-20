using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/Icon_retrieve.png")]
    public class Retrieve_LocalCache : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        public object TargetCell { get; set; }

        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        [FormulaProperty(true)]
        [DisplayName("期望的版本")]
        public object VersionString { get; set; }

        public override string ToString()
        {
            return "从客户端缓存中读取";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>();

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("键"),
                Value = KeyString?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("目标单元格"),
                Value = TargetCell?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("期望的版本"),
                Value = VersionString?.ToString()
            });

            return result ;
        }

        public IEnumerable<GenerateCellInfo> GetForceGenerateCells()
        {
            List<GenerateCellInfo> result = new List<GenerateCellInfo>();

            if (KeyString is IFormulaReferObject formulaReferObject)
            {
                var kString = formulaReferObject.GetGenerateCellInfo();
                if (kString != null)
                {
                    result.Add(kString);
                }
            }

            if (TargetCell is IFormulaReferObject formulaReferObject2)
            {
                var cellInfo = formulaReferObject2.GetGenerateCellInfo();
                if (cellInfo != null)
                {
                    result.Add(cellInfo);
                }
            }

            if (VersionString is IFormulaReferObject formulaReferObject3)
            {
                var vString = formulaReferObject3.GetGenerateCellInfo();
                if (vString != null)
                {
                    result.Add(vString);
                }
            }

            return result;
        }
    }
}
