module.exports = {


	/* 应用AppID */
	"appid": 2016101200665449,

	/* 通知URL */
	"notifyUrl": "http://192.168.0.104:3000/callback",

	/* 应用RSA私钥 请勿忘记 ----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
	"merchantPrivateKey":"-----BEGIN RSA PRIVATE KEY-----\r\n" +
	"MIIEowIBAAKCAQEAvqCBRb8xOCj24Gip5mPfeipbQvqw8zyUK37EqXVP+xbtQnEO7vI17AepcS9s5MoJg0Zq/KHHknywwUnc6SUD/iPzlAR/EYUByOGq/BmqdbVwHsZbM/YbHe4ddHfzm2wf4ghyvMqUOevvvHkXCjz63TnqtqRPS08N1D00dUGdWHDn9hl71lIUgFgLtHiQ0dAjNLHG1K9jImDQaJI0lXi91SWxDxFdfJ86aTAacSQ2T/1KMHUx2XvokXue2tt7YU/IGdqzewWSYhOorRImImcUsQ6w1nPS6vYzZmMjthGdyl+MdLNsGuqBE8CnzNvMCXMdPU4p4oY30YsnhiKvdjnafQIDAQABAoIBAHs9BvYRaf+VtC1WXOi+jp7LPV7q9XT7KAuKlBe96Ow6YT8AGpht7GBgf7HV6D9tQoMlBku3R2+zvw3m87Oio5cspO9/jKrF42Z8Rm9fJG2e1BKBSDsqk1NhOpeuaMaFO4OE1LCrAvMDTmT5n+SVkdVt+QkE5uKYBCe/PefEeLXQghu3UZCmhBjE7CdS5pOioLAnV5hvTaQFpj5dQECoJKdBb7Ufv1TqpWiOdeMxpB2xBsgWM1pJ5bYdOqkz47SQPs/NZO5ftAqTTGpGtEmCWHxfOGW18JJyHFeQAbAj7/ZzIqO827G4juJozBNhPOCBDSc6nsU9+HVGgHhB1tmJbIECgYEA7oxepPinO0GPZNNz3tHeUoT3Jw0WA+uSG2ku9B58MuGvs+BUh5ZBYjEA6HYEv2S6E+uO68VWvP8Gfv21419unRBT4BsFCCwPyTKyt/qmp6QwWYL10nlkQD5J+nyNXICDg9cQM38zx+0CdYk+5XtVWRqe8aAJ1UeEK2FBHiaGyh0CgYEAzJKlDLOgJkTWgcputJtUVJ5BQcVrIwznQr8XFKjkbTotftZ3Dtlk6wJkUK7na/NSaUOkkZcvl8l4wElVllAT0TVOjoUgl0vvGyvIIaFPV0/zRcSfmbZtrIzM/fxzajjFjmn67rWPgYogT9uF15o1AZ/yGbF7V2h1ExNTqTStY+ECgYA//GDqqVPaHiTDa8CZ1PtocQgGbokoNgjz10vj6UVxNH43poWl9NTG7NQMhpORbwhGjZnBfiZc/Z8VcyJVweRetuF4rGa2IXN+iV3M4avQLcdWSz163lrYrJyVVtFoLYSZWZeb6JPQHa/aLR002tcy1mQp9b6Neehm5mhcGQNwtQKBgE/ENlsXhzCk0sdU+Ymur1k3Q9azdaz7EQlznTpPCJKWhrrYQSAnIDSKgDb9m/r5q36kA31JaCNVSaIgdiDgJHoEwRbNTgHwd9EuZyDF1zwCTqc7nce/3E/VrvCyCQa4EEARjuiZHtWx2BuLS0rgNB7oEOx3ydIxRsUjWhG2Go3BAoGBAMoVFze6i33ohV9SGrkEqSakfULG/vimvnD/RsCDjicGt4IwkjjLyAdtq3xsBifdvxO3usYB2lavKrs4YmdY+XLz2//2GzwGosRhuyvwP1zU9ErsSDGh8GLgWKsyZ7wP/6oekttg0l5dP3r6up5+2NvnbYDrgB0dcIKMT9qmSXgu" +
	"\r\n-----END RSA PRIVATE KEY-----",

	/* 支付宝公钥 如果为空会使用默认值 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
	"alipayPublicKey": "-----BEGIN PUBLIC KEY-----\r\n" +
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApdTd9ogBVon8UDRLoKEigFwTtgo/ewMOQro2WBnVE9s55/LoI8xCbvEaA0x7yvRenUb6SnuuA5WVxJTYMD7OXWRbm2sIf1CwmTo/AnhBOEelA0OfF2LWDBaRuKSK3/tslJZxjeLbeWJyKZMDrg9pN+jANt0/siaIE6/6vSrdDAitqXuawhRJSw6WZalgQlM2meVnf8Hb1xcrPKwyprY7YGvfP53tiuPPhP0pfgxVj4zOF4s4CO2RLPvfLj/wJn1u0jxfV0CXUazCtWse6cufbU3QnuXgFCtW8WdqQqgxrf7bNny4quiX0Z5GOnsi34Wws0uO+rV2i7wI1MO1KlSz3QIDAQAB" +
	"\r\n-----END PUBLIC KEY-----",
	
	/* 支付宝支付网关 如果为空会使用沙盒网关 */
	"gatewayUrl": "https://openapi.alipaydev.com/gateway.do"
};
