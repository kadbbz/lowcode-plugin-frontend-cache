using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/IconDownload.png")]
    [Category("客户端缓存")]
    [OrderWeight(100)]
    public class Retrieve_LocalCache2 : Command
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

        [ResultToProperty]
        [DisplayName("将数据保存到变量")]
        [OrderWeight(3)]
        public string OutParamaterName { get; set; }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(OutParamaterName))
            {
                return "从客户端缓存中读取";
            }
            else
            {
                return "从客户端缓存中读取：" + OutParamaterName;
            }

        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }
    }
}
