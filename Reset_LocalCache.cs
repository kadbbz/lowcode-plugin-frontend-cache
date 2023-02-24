using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/IconDeleteFile.png")]
    [Category("客户端缓存")]
    [OrderWeight(200)]
    public class Reset_LocalCache : Command
    {
        [FormulaProperty]
        [DisplayName("键（大小写敏感）")]
        [SearchableProperty]
        [OrderWeight(1)]
        public object KeyString { get; set; }

        public override string ToString()
        {
            return "重置客户端缓存";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

       
    }
}
