
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

        if (window.localKv) {
            // HAC
            window.localKv.upsertV(key,value,version);
        } else {
            // 浏览器
            var realKey = key + "|" + version;
            localStorage.setItem(realKey, value);
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
            var realKey = key + "|" + version;
            var value = localStorage.getItem(realKey);

            Forguncy.Page.getCellByLocation(cellLocationV).setValue(value);
        }

    };

    return Retrieve_LocalCache_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Retrieve_LocalCache, FrontendCacheCommand", Retrieve_LocalCache_Command);
