const fs = require("fs");

const EventEmitter = require("events");

class ReadStream extends EventEmitter {

    constructor(path, options = {}) {

        super();

        //参考fs 写实例需要用到的参数

        this.path = path;

        this.flags = options.flags || "r";

        this.encoding - options.encoding || null;

        this.autoClose = options.autoClose || true;

        this.start = options.start || 0;

        this.end = options.end;

        this.highWaterMark = options.highWaterMark || 64 * 1024;

        this.fd = undefined;

        this.offset = this.start;

        this.flowing = false;

        this.open();

        this.on("newListener", function (type) {

            if (type === "data") {

                this.flowing = true;

                this.read();

            }

        });

    }

    destroy(err) {

        if (err) {

            this.emit("error");

        }

        if (this.autoClose) {

            fs.close(this.fd, () => {

                this.emit("close");

            });

        }

    }

    open() {

        fs.open(this.path, this.flags, (err, fd) => {

            if (err) {

                return this.destroy(err);

            }

            this.fd = fd;

            this.emit("open", fd);

        });

    }

    resume() {

        if (!this.flowing) {

            this.flowing = true;

            this.read();

        }

    }

    pause() {

        this.flowing = false;

    }



    read() {

        if (typeof this.fd !== "number") {

            return this.once("open", () => this.read());

        }

        let howMuchToRead = this.end

            ? Math.min(this.end - this.offset + 1, this.highWaterMark)

            : this.highWaterMark;

        const buffer = Buffer.alloc(this.highWaterMark);

        fs.read(

            this.fd, // 文件描述符

            buffer, // 缓冲区，数据将被写入

            0, // 写入的偏移量

            howMuchToRead, // 指定文件读取的字节长度

            this.offset, // 指定文件读取的起始位置

            (err, bytesRead) => {

                if (bytesRead) {

                    this.offset += bytesRead;

                    this.emit("data", buffer.slice(0, bytesRead));

                    if (this.flowing) {

                        this.read();

                    }

                } else {

                    this.emit("end");

                    this.destroy();

                }

            }

        );

    }

}
module.exports = ReadStream;