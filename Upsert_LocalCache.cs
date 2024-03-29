﻿using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System.Collections.Generic;
using System.ComponentModel;

namespace FrontendCacheCommand
{
    [Icon("pack://application:,,,/FrontendCacheCommand;component/Resources/IconUpload.png")]
    [Category("客户端缓存")]
    [OrderWeight(1)]
    public class Upsert_LocalCache : Command
    {
        [FormulaProperty()]
        [DisplayName("键（大小写敏感）")]
        [OrderWeight(1)]
        [SearchableProperty]
        public object KeyString { get; set; }

        [FormulaProperty()]
        [DisplayName("值")]
        [OrderWeight(2)]
        [SearchableProperty]
        public object ValueString { get; set; }

        [FormulaProperty()]
        [OrderWeight(3)]
        [DisplayName("版本")]
        [SearchableProperty]
        public object VersionString { get; set; }

        public override string ToString()
        {
            return "存入客户端缓存";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.All;
        }

    }
}
