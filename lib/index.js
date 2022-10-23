"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "use strict";
  var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0: case 1: t = op; break;
          case 4: _.label++; return { value: op[1], done: false };
          case 5: _.label++; y = op[1]; op = [0]; continue;
          case 7: op = _.ops.pop(); _.trys.pop(); continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
            if (t[2]) _.ops.pop();
            _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var Exporter = (function () {
    function Exporter(connection, buildQuery, format, write, end, attributes) {
      this.connection = connection;
      this.buildQuery = buildQuery;
      this.format = format;
      this.write = write;
      this.end = end;
      this.attributes = attributes;
      if (attributes) {
        this.map = buildMap(attributes);
      }
      this.export = this.export.bind(this);
    }
    Exporter.prototype.export = function (ctx) {
      return __awaiter(this, void 0, void 0, function () {
        var idx, stmt, reader, er;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              idx = 0;
              return [4, this.buildQuery(ctx)];
            case 1:
              stmt = _a.sent();
              reader = this.connection.query(stmt.query, stmt.params);
              reader.on('error', function (err) { return er = err; });
              if (this.map) {
                reader.on('result', function (row) {
                  return __awaiter(_this, void 0, void 0, function () {
                    var obj, data;
                    return __generator(this, function (_a) {
                      ++idx;
                      this.connection.pause();
                      obj = mapOne(row, this.map);
                      data = this.format(obj);
                      this.write(data);
                      this.connection.resume();
                      return [2];
                    });
                  });
                });
              }
              else {
                reader.on('result', function (row) {
                  return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                      ++idx;
                      this.connection.pause();
                      data = this.format(row);
                      this.write(data);
                      this.connection.resume();
                      return [2];
                    });
                  });
                });
              }
              return [2, new Promise(function (resolve, reject) {
                reader.on('end', function () {
                  _this.end();
                  if (er) {
                    reject(er);
                  }
                  else {
                    _this.connection.end(function (err) {
                      if (err) {
                        reject(err);
                      }
                      else {
                        resolve(idx);
                      }
                    });
                  }
                });
              })];
          }
        });
      });
    };
    return Exporter;
  }());
  exports.Exporter = Exporter;
  var ExportService = (function () {
    function ExportService(connection, queryBuilder, formatter, writer, attributes) {
      this.connection = connection;
      this.queryBuilder = queryBuilder;
      this.formatter = formatter;
      this.writer = writer;
      this.attributes = attributes;
      if (attributes) {
        this.map = buildMap(attributes);
      }
      this.export = this.export.bind(this);
    }
    ExportService.prototype.export = function (ctx) {
      return __awaiter(this, void 0, void 0, function () {
        var idx, stmt, reader, er;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              idx = 0;
              return [4, this.queryBuilder.build(ctx)];
            case 1:
              stmt = _a.sent();
              reader = this.connection.query(stmt.query, stmt.params);
              reader.on('error', function (err) { return er = err; });
              if (this.map) {
                reader.on('result', function (row) {
                  return __awaiter(_this, void 0, void 0, function () {
                    var obj, data;
                    return __generator(this, function (_a) {
                      ++idx;
                      this.connection.pause();
                      obj = mapOne(row, this.map);
                      data = this.formatter.format(obj);
                      this.writer.write(data);
                      this.connection.resume();
                      return [2];
                    });
                  });
                });
              }
              else {
                reader.on('result', function (row) {
                  return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                      ++idx;
                      this.connection.pause();
                      data = this.formatter.format(row);
                      this.writer.write(data);
                      this.connection.resume();
                      return [2];
                    });
                  });
                });
              }
              return [2, new Promise(function (resolve, reject) {
                reader.on('end', function () {
                  if (_this.writer.end) {
                    _this.writer.end();
                  }
                  else if (_this.writer.flush) {
                    _this.writer.flush();
                  }
                  if (er) {
                    reject(er);
                  }
                  else {
                    _this.connection.end(function (err) {
                      if (err) {
                        reject(err);
                      }
                      else {
                        resolve(idx);
                      }
                    });
                  }
                });
              })];
          }
        });
      });
    };
    return ExportService;
  }());
  exports.ExportService = ExportService;
  function mapOne(results, m) {
    var obj = results;
    if (!m) {
      return obj;
    }
    var mkeys = Object.keys(m);
    if (mkeys.length === 0) {
      return obj;
    }
    var obj2 = {};
    var keys = Object.keys(obj);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var key = keys_1[_i];
      var k0 = m[key];
      if (!k0) {
        k0 = key;
      }
      obj2[k0] = (obj)[key];
    }
    return obj2;
  }
  exports.mapOne = mapOne;
  function buildMap(attrs) {
    var mp = {};
    var ks = Object.keys(attrs);
    var isMap = false;
    for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
      var k = ks_1[_i];
      var attr = attrs[k];
      attr.name = k;
      var field = (attr.column ? attr.column : k);
      var s = field.toLowerCase();
      if (s !== k) {
        mp[s] = k;
        isMap = true;
      }
    }
    if (isMap) {
      return mp;
    }
    return undefined;
  }
  exports.buildMap = buildMap;
  function select(table, attrs) {
    var cols = [];
    var ks = Object.keys(attrs);
    for (var _i = 0, ks_2 = ks; _i < ks_2.length; _i++) {
      var k = ks_2[_i];
      var attr = attrs[k];
      attr.name = k;
      var field = (attr.column ? attr.column : k);
      cols.push(field);
    }
    return "select " + cols.join(',') + " from " + table;
  }
  exports.select = select;
  "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Exporter = (function () {
  function Exporter(connection, buildQuery, format, write, end, attributes) {
    this.connection = connection;
    this.buildQuery = buildQuery;
    this.format = format;
    this.write = write;
    this.end = end;
    this.attributes = attributes;
    if (attributes) {
      this.map = buildMap(attributes);
    }
    this.export = this.export.bind(this);
  }
  Exporter.prototype.export = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var idx, stmt, reader;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            idx = 0;
            return [4, this.buildQuery(ctx)];
          case 1:
            stmt = _a.sent();
            reader = this.connection.query(stmt.query, stmt.params);
            reader.on('error', function (err) { return console.error(err); });
            if (this.map) {
              reader.on('result', function (row) {
                return __awaiter(_this, void 0, void 0, function () {
                  var obj, data;
                  return __generator(this, function (_a) {
                    ++idx;
                    this.connection.pause();
                    obj = mapOne(row, this.map);
                    data = this.format(obj);
                    this.write(data);
                    this.connection.resume();
                    return [2];
                  });
                });
              });
            }
            else {
              reader.on('result', function (row) {
                return __awaiter(_this, void 0, void 0, function () {
                  var data;
                  return __generator(this, function (_a) {
                    ++idx;
                    this.connection.pause();
                    data = this.format(row);
                    this.write(data);
                    this.connection.resume();
                    return [2];
                  });
                });
              });
            }
            return [2, new Promise(function (resolve, reject) {
              reader.on('end', function () {
                _this.end();
                _this.connection.end(function (err) {
                  if (err) {
                    reject(err);
                  }
                });
                resolve(idx);
              });
            })];
        }
      });
    });
  };
  return Exporter;
}());
exports.Exporter = Exporter;
var ExportService = (function () {
  function ExportService(connection, queryBuilder, formatter, writer, attributes) {
    this.connection = connection;
    this.queryBuilder = queryBuilder;
    this.formatter = formatter;
    this.writer = writer;
    this.attributes = attributes;
    if (attributes) {
      this.map = buildMap(attributes);
    }
    this.export = this.export.bind(this);
  }
  ExportService.prototype.export = function (ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var idx, stmt, reader;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            idx = 0;
            return [4, this.queryBuilder.build(ctx)];
          case 1:
            stmt = _a.sent();
            reader = this.connection.query(stmt.query, stmt.params);
            reader.on('error', function (err) { return console.error(err); });
            if (this.map) {
              reader.on('result', function (row) {
                return __awaiter(_this, void 0, void 0, function () {
                  var obj, data;
                  return __generator(this, function (_a) {
                    ++idx;
                    this.connection.pause();
                    obj = mapOne(row, this.map);
                    data = this.formatter.format(obj);
                    this.writer.write(data);
                    this.connection.resume();
                    return [2];
                  });
                });
              });
            }
            else {
              reader.on('result', function (row) {
                return __awaiter(_this, void 0, void 0, function () {
                  var data;
                  return __generator(this, function (_a) {
                    ++idx;
                    this.connection.pause();
                    data = this.formatter.format(row);
                    this.writer.write(data);
                    this.connection.resume();
                    return [2];
                  });
                });
              });
            }
            return [2, new Promise(function (resolve, reject) {
              reader.on('end', function () {
                if (_this.writer.end) {
                  _this.writer.end();
                }
                else if (_this.writer.flush) {
                  _this.writer.flush();
                }
                _this.connection.end(function (err) {
                  if (err) {
                    reject(err);
                  }
                });
                resolve(idx);
              });
            })];
        }
      });
    });
  };
  return ExportService;
}());
exports.ExportService = ExportService;
function mapOne(results, m) {
  var obj = results;
  if (!m) {
    return obj;
  }
  var mkeys = Object.keys(m);
  if (mkeys.length === 0) {
    return obj;
  }
  var obj2 = {};
  var keys = Object.keys(obj);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var k0 = m[key];
    if (!k0) {
      k0 = key;
    }
    obj2[k0] = (obj)[key];
  }
  return obj2;
}
exports.mapOne = mapOne;
function buildMap(attrs) {
  var mp = {};
  var ks = Object.keys(attrs);
  var isMap = false;
  for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
    var k = ks_1[_i];
    var attr = attrs[k];
    attr.name = k;
    var field = (attr.column ? attr.column : k);
    var s = field.toLowerCase();
    if (s !== k) {
      mp[s] = k;
      isMap = true;
    }
  }
  if (isMap) {
    return mp;
  }
  return undefined;
}
exports.buildMap = buildMap;
function select(table, attrs) {
  var cols = [];
  var ks = Object.keys(attrs);
  for (var _i = 0, ks_2 = ks; _i < ks_2.length; _i++) {
    var k = ks_2[_i];
    var attr = attrs[k];
    attr.name = k;
    var field = (attr.column ? attr.column : k);
    cols.push(field);
  }
  return "select " + cols.join(',') + " from " + table;
}
exports.select = select;
