/**
 * WaveFile: https://github.com/rochars/wavefile
 * Copyright (c) 2017-2018 Rafael da Silva Rocha. MIT License.
 *
 * Test converting a 16-bit RIFX file to RIFF.
 * 
 */

const assert = require("assert");
const fs = require("fs");
const WaveFile = require("../../test/loader.js");
const path = "test/files/";

describe("16-bit RIFX to RIFF", function() {

    let rifxwav = new WaveFile(
        fs.readFileSync(path + "RIFX-16bit-mono.wav"));
    rifxwav.toRIFF();
    fs.writeFileSync(
        path + "/out/RIFX-to-RIFF-16bit-mono.wav", rifxwav.toBuffer());

    let wav = new WaveFile(
        fs.readFileSync(path + "/out/RIFX-to-RIFF-16bit-mono.wav"));

    // The same contents in the original RIFF file
    let riffWav = new WaveFile(
        fs.readFileSync(path + "16-bit-8kHz-noBext-mono.wav"));

    it("chunkId should be 'RIFF'", function() {
        assert.equal(wav.container, "RIFF");
    });
    it("fmtChunkId should be 'fmt '", function() {
        assert.equal(wav.fmt.chunkId, "fmt ");
    });
    it("format should be 'WAVE'", function() {
        assert.equal(wav.format, "WAVE");
    });
    it("fmtChunkSize should be 16", function() {
        assert.equal(wav.fmt.chunkSize, 16);
    });
    it("audioFormat should be 1 (PCM)", function() {
        assert.equal(wav.fmt.audioFormat, 1);
    });
    it("numChannels should be 1", function() {
        assert.equal(wav.fmt.numChannels, 1);
    });
    it("sampleRate should be 8000", function() {
        assert.equal(wav.fmt.sampleRate, 8000);
    });
    it("byteRate be 16000", function() {
        assert.equal(wav.fmt.byteRate, 16000);
    });
    it("blockAlign should be 2", function() {
        assert.equal(wav.fmt.blockAlign, 2);
    });
    it("bitsPerSample should be 16", function() {
        assert.equal(wav.fmt.bitsPerSample, 16);
    });
    it("dataChunkId should be 'data'", function() {
        assert.equal(wav.data.chunkId, 'data');
    });
    it("dataChunkSize should be > 0", function() {
        assert.ok(wav.data.chunkSize > 0);
    });
    it("samples.length should be > 0", function() {
        assert.ok(wav.data.samples.length > 0);
    });
    it("samples in RIFF-from-RIFX file should be the same as in the " +
        "RIFF file", function() {
        assert.deepEqual(wav.data.samples, rifxwav.data.samples);
    });
});

describe("RF64 to RIFF", function() {

    let fs = require("fs");
    const WaveFile = require("../../test/loader.js");
    let path = "test/files/";
    let wav2 = new WaveFile(
        fs.readFileSync(path + "RF64-16bit-8kHz-stereo-reaper.wav"));
    wav2.toRIFF();
    fs.writeFileSync(
        path + "/out/RIFF-16bit-8kHz-stereo-from-RF64.wav",
        wav2.toBuffer());
    let wav = new WaveFile(
        fs.readFileSync(path + "/out/RIFF-16bit-8kHz-stereo-from-RF64.wav"));

    it("chunkId should be 'RIFF'", function() {
        assert.equal(wav.container, "RIFF");
    });
    it("fmtChunkId should be 'fmt '", function() {
        assert.equal(wav.fmt.chunkId, "fmt ");
    });
    it("format should be 'WAVE'", function() {
        assert.equal(wav.format, "WAVE");
    });
    it("fmtChunkSize should be 16", function() {
        assert.equal(wav.fmt.chunkSize, 16);
    });
    it("audioFormat should be 1", function() {
        assert.equal(wav.fmt.audioFormat, 1);
    });
    it("numChannels should be 2", function() {
        assert.equal(wav.fmt.numChannels, 2);
    });
    it("sampleRate should be 8000", function() {
        assert.equal(wav.fmt.sampleRate, 8000);
    });
    it("byteRate should be 32000", function() {
        assert.equal(wav.fmt.byteRate, 32000);
    });
    it("blockAlign should be 4", function() {
        assert.equal(wav.fmt.blockAlign, 4);
    });
    it("bitsPerSample should be 16", function() {
        assert.equal(wav.fmt.bitsPerSample, 16);
    });
    it("dataChunkId should be 'data'", function() {
        assert.equal(wav.data.chunkId, 'data');
    });
    it("dataChunkSize should be > 0", function() {
        assert.ok(wav.data.chunkSize > 0);
    });
    it("samples.length should be > 0", function() {
        assert.ok(wav.data.samples.length > 0);
    });
});
