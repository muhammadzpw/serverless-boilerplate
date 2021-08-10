data "aws_s3_bucket" "mzpw_staging" {
  bucket = "mzpw-staging"
}

resource "aws_s3_bucket_object" "lambda_hello_world" {
  bucket = data.aws_s3_bucket.mzpw_staging.id
  key    = "lambda-artifact/hello-world.zip"
  source = data.archive_file.lambda_hello_world.output_path

  etag = filemd5(data.archive_file.lambda_hello_world.output_path)
}

resource "aws_s3_bucket_object" "lambda_hello_go" {
  bucket = data.aws_s3_bucket.mzpw_staging.id
  key    = "lambda-artifact/hello-go.zip"
  source = data.archive_file.lambda_hello_go.output_path

  etag = filemd5(data.archive_file.lambda_hello_go.output_path)
}
