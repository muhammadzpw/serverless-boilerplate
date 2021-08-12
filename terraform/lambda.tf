resource "aws_lambda_function" "hello_world" {
  function_name = "HelloWorld"

  s3_bucket = data.aws_s3_bucket.mzpw_staging.bucket
  s3_key    = aws_s3_bucket_object.lambda_hello_world.key

  runtime = "nodejs12.x"
  handler = "hello.handler"

  source_code_hash = data.archive_file.lambda_hello_world.output_base64sha256

  role = data.aws_iam_role.serverless_role.arn
}

resource "aws_lambda_function" "hello_go" {
  function_name = "HelloGo"

  s3_bucket = data.aws_s3_bucket.mzpw_staging.bucket
  s3_key    = aws_s3_bucket_object.lambda_hello_go.key

  runtime = "go1.x"
  handler = "main"

  source_code_hash = data.archive_file.lambda_hello_go.output_base64sha256

  role = data.aws_iam_role.serverless_role.arn
}
