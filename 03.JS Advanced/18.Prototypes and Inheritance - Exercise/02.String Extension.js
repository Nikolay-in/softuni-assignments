(() => {
    String.prototype.ensureStart = function(str) {
        if (!this.startsWith(str)) {
            return str + this.toString();
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function(str) {
        if (!this.endsWith(str)) {
            return this.toString() + str;
        }
        return this.toString();
    }
    
    String.prototype.isEmpty = function() {
        return this.toString() === "" ? true : false;
    }

    String.prototype.truncate = function(n) {
        if (this.length <= n) {
            return this.toString();
        }
        if (n < 4) {
            return '.'.repeat(n);
        }
        let words = this.split(' ');
        while ((words.join(' ') + '...').length > n) {
            if (words.length > 1) {
                words.pop();
            } else {
                words[0] = words[0].slice(0, n - 3)
            }
        }
        return words.join(' ').trim() + '...';
    }

    String.format = function(string, ...params) {
        params.forEach((w) => (string = string.replace(/{\d}/, w)));
        return string;
    }
})();

let str = 'my    string   my       string';
str = str.ensureStart('my');
str = str.ensureStart('');
str = str.ensureStart('hello    ');
str = str.ensureEnd('ing');
str = str.ensureEnd('in');
str = str.ensureEnd('');
str = '        ';
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = str.truncate(1);
str = String.format('The {0} {1} fox',
  'quick', 'brown');
str = String.format('jumps {0} {1}',
  'dog');

