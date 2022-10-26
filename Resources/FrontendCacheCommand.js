
var DATA_NOT_FOUND = "DATA_NOT_FOUND";

var Upsert_LocalCache_Command = (function (_super) {
    __extends(Upsert_LocalCache_Command, _super);
    function Upsert_LocalCache_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Upsert_LocalCache_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var value = this.evaluateFormula(param.ValueString);
        var version = this.evaluateFormula(param.VersionString);

        if (value === DATA_NOT_FOUND) {
            throw "不能传入本插件用于标示没找到缓存的关键字：DATA_NOT_FOUND";
        } else {
            if (window.localKv) {
                // HAC
                window.localKv.upsertV(key, value, version);
            } else {
                // 浏览器
                var realKey = key;
                localStorage.setItem(realKey, JSON.stringify({
                    version: version,
                    value: value
                }));
            }
        }
    };

    return Upsert_LocalCache_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Upsert_LocalCache, FrontendCacheCommand", Upsert_LocalCache_Command);


var Retrieve_LocalCache_Command = (function (_super) {
    __extends(Retrieve_LocalCache_Command, _super);
    function Retrieve_LocalCache_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Retrieve_LocalCache_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var version = this.evaluateFormula(param.VersionString);
        var targetCellFormulaV = param.TargetCell;
        var cellLocationV = this.getCellLocation(targetCellFormulaV);
        var cellInfoV = JSON.stringify(cellLocationV);

        if (window.localKv) {
            // HAC
            window.localKv.retrieveV(key, version, cellInfoV);
        } else {
            // 浏览器
            var realKey = key;
            var value = JSON.parse(localStorage.getItem(realKey));

            if (value && value.version === version) {
                Forguncy.Page.getCellByLocation(cellLocationV).setValue((value.value) ? JSON.stringify(value.value) : DATA_NOT_FOUND);
            } else {
                Forguncy.Page.getCellByLocation(cellLocationV).setValue(DATA_NOT_FOUND);
            }
        }

    };

    return Retrieve_LocalCache_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Retrieve_LocalCache, FrontendCacheCommand", Retrieve_LocalCache_Command);
