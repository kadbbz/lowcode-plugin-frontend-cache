using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/IconDownload.png")]
    [Category("客户端缓存")]
    [OrderWeight(110)]
    public class Retrieve_LocalCache : Command
    {
        [FormulaProperty()]
        [DisplayName("键（大小写敏感）")]
        [SearchableProperty]
        [OrderWeight(1)]
        public object KeyString { get; set; }

        [FormulaProperty()]
        [DisplayName("期望的版本")]
        [SearchableProperty]
        [OrderWeight(2)]
        public object VersionString { get; set; }

        [FormulaProperty(true)]
        [DisplayName("目标单元格")]
        [SearchableProperty]
        [OrderWeight(3)]
        public object TargetCell { get; set; }

        public override string ToString()
        {
            return "从客户端缓存中读取到单元格";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }
    }
}
