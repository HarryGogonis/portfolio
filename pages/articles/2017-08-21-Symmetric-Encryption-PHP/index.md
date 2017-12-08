---
title: "Symmetric Encryption in PHP"
date: "Mon Aug 21 11:48:12 EDT 2017"
layout: post
path: "/symmetric-encryption-php/"
category: "how-to"
description: "How to encrypt/decrypt data in PHP"
cover: "cover.jpeg"
---
## Introduction
PHP has multiple implementations of symmetric encryption implemented. If you are using [mcrypt](https://secure.php.net/manual/en/function.mcrypt-cbc.php) this library is deprecated in PHP 5.5.0 and removed in PHP 7.0.0.

As of August 2017, the proper way of encrypting in PHP is to use [openssl](https://secure.php.net/manual/en/book.openssl.php) with AES-256-CBC mode. CTR mode is not currently implemented.

## Encryption
### Chose an encryption method and key
As of writing, AES-256-CBC is the best method.
```php
$method = 'AES-256-CBC'
```

Your key must be a secret, so you might want to use an environment variable.
```php
$key = getenv('NAMESPACED_CRYPTO_KEY')
```

### Generate an Initialization Vector (IV)
An IV is a parameter to the cipher. The IV *is not secret*. Ideally you want this IV to be unique, so we will use cryptographically random bytes as an IV.
```php
$length = openssl_cipher_iv_length($method);
$iv = openssl_random_pseudo_bytes($length);
```

### Encrypt your data
```php
$encrypted = openssl_encrypt($pltxt, $method, $key, OPENSSL_RAW_DATA, $iv);

// openssl_encrypt returns FALSE on failure
// so you might want to check for this and throw an exception
```

### Encode IV
We will append the IV to the encrypted cipher text so we can retrieve it for decryption. You could store them in separate variables or database columns if you wish.
```php
$ctxt = base64_encode($encrypted) . '|' . base64_encode($iv);
```

## Decryption
### Decode IV
We need to extract the IV and cipher text from our encoded string. If you stored them separately you can skip this step.
```php
list($data, $iv) = explode('|', $encrypted);
$iv = base64_decode($iv);
```

### Decrypt  your data
```php
$pltxt = openssl_decrypt($data, $method, $key, 0, $iv);

// openssl_decrypt returns FALSE on failure
// so you might want to check for this and throw an exception
```
