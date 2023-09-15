
var DATA_NOT_FOUND = "DATA_NOT_FOUND";
var DATA_NULL = "DATA_NULL";

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

        if (value === DATA_NOT_FOUND || value === DATA_NULL) {
            throw "不能传入本插件用于标示没找到缓存的关键字：DATA_NOT_FOUND、DATA_NULL";
        } else {

            if (window.localKv) {

                if (value === null) {
                    value = DATA_NULL;
                }

                if (value instanceof Object) {
                    value = JSON.stringify(value);
                }

                window.localKv.upsertV(key, value, version);
            } else {
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
            var valueB = JSON.parse(localStorage.getItem(realKey));

            if (valueB && valueB.version === version) {

                var realValue;

                if (valueB.value === undefined) {
                    realValue = DATA_NOT_FOUND;
                } else if (valueB.value === DATA_NULL) {
                    realValue = null;
                } else {
                    realValue = valueB.value
                }

                Forguncy.Page.getCellByLocation(cellLocationV).setValue(realValue);
            } else {
                Forguncy.Page.getCellByLocation(cellLocationV).setValue(DATA_NOT_FOUND);
            }
        }

    };

    return Retrieve_LocalCache_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Retrieve_LocalCache, FrontendCacheCommand", Retrieve_LocalCache_Command);

var Reset_LocalCache_Command = (function (_super) {
    __extends(Reset_LocalCache_Command, _super);
    function Reset_LocalCache_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Reset_LocalCache_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);

        if (window.localKv) {
            // HAC
            window.localKv.remove(key);
        } else {
            // 浏览器
            localStorage.removeItem(key);
        }

    };

    return Reset_LocalCache_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Reset_LocalCache, FrontendCacheCommand", Reset_LocalCache_Command);

var Retrieve_LocalCache2_Command = (function (_super) {
    __extends(Retrieve_LocalCache2_Command, _super);
    function Retrieve_LocalCache2_Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    Retrieve_LocalCache2_Command.prototype.execute = function () {

        var param = this.CommandParam;
        var key = this.evaluateFormula(param.KeyString);
        var version = this.evaluateFormula(param.VersionString);
        var OutParamaterName = param.OutParamaterName;
        var value = DATA_NOT_FOUND;

        if (window.localKv && window.localKv.retrieve2) {
            // HAC
            value = window.localKv.retrieveV2(key, version);

            if (value !== DATA_NOT_FOUND) {
                value = JSON.parse(value);
            }

        } else {
            // 浏览器
            var realKey = key;
            var valueB = JSON.parse(localStorage.getItem(realKey));

            if (valueB && valueB.version === version && valueB.value) {
               
                if (valueB.value === undefined) {
                    value = DATA_NOT_FOUND;
                } else if (valueB.value === DATA_NULL) {
                    value = null;
                } else {
                    value = valueB.value
                }
            }
        }

        if (OutParamaterName && OutParamaterName != "") {
            Forguncy.CommandHelper.setVariableValue(OutParamaterName, value);
        } else {
            this.log("OutParamaterName was not set, the value is: " + JSON.stringify(value));
        }

    };

    return Retrieve_LocalCache2_Command;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("FrontendCacheCommand.Retrieve_LocalCache2, FrontendCacheCommand", Retrieve_LocalCache2_Command);