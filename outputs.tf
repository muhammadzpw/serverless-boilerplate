# Output value definitions

output "lambda_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.hello_world.arn
}
output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.hello_world.function_name
}

output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}
