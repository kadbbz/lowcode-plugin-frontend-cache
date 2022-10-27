using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/Icon_upsert.png")]
    public class Reset_LocalCache : Command, IPropertySearchable, IForceGenerateCell
    {
        [FormulaProperty(true)]
        [DisplayName("键（大小写敏感）")]
        public object KeyString { get; set; }

        public object VersionString { get; set; }

        public override string ToString()
        {
            return "重置客户端缓存";
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

            return result;
        }
    }
}
