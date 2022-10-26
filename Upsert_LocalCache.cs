using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/Icon_upsert.png")]
    public class Upsert_LocalCache : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        [FormulaProperty(true)]
        [DisplayName("值")]
        public object ValueString { get; set; }

        [FormulaProperty(true)]
        [DisplayName("版本")]
        public object VersionString { get; set; }

        public override string ToString()
        {
            return "存入客户端缓存";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

        public IEnumerable<FindResultItem> EnumSearchableProperty(LocationIndicator location)
        {
            List<FindResultItem> result = new List<FindResultItem>();

            result.Add(new FindResultItem() { 
                Location = location.AppendProperty("键"),
                Value = KeyString?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("值"),
                Value = ValueString?.ToString()
            });

            result.Add(new FindResultItem()
            {
                Location = location.AppendProperty("版本"),
                Value = VersionString?.ToString()
            });

            return result;
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

            if (ValueString is IFormulaReferObject formulaReferObject2)
            {
                var vString = formulaReferObject2.GetGenerateCellInfo();
                if (vString != null)
                {
                    result.Add(vString);
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
