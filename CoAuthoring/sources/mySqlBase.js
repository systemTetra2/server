﻿var config = require('./config.json');var configMySql = config["mysql"];var mysql = require('mysql');var tableName = configMySql["tableName"];var pool  = mysql.createPool({	host		: configMySql["host"],	user		: configMySql["user"],	password	: configMySql["pass"],	database	: configMySql["database"],	charset		: configMySql["charset"],});exports.insert = function (docId, userid, saveData, serverHost, serverPath, documentFormatSave) {	pool.getConnection(function(err, connection) {		var sqlCommand = "INSERT INTO " + tableName +			" (docid, userid, data, serverHost, serverPath, documentFormatSave) VALUES ('" + docId + "','" + userid +			"','" + saveData + "','" + serverHost + "','" + serverPath + "','" + documentFormatSave + "');";		connection.query(sqlCommand, function (err, result) {			connection.release();		});	});};exports.load = function (callbackFunction) {	pool.getConnection(function(err, connection) {		var sqlCommand = "SELECT * FROM " + tableName + ";";		connection.query(sqlCommand, function (err, result) {			connection.release();			callbackFunction(result);		});	});};