package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleLambdaEvent(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("Processing request data for request %s.\n", request.RequestContext.RequestID)
	fmt.Printf("Body size = %d.\n", len(request.Body))

	fmt.Println("Headers:")
	for key, value := range request.Headers {
		fmt.Printf("    %s: %s\n", key, value)
	}

	headers := map[string]string{
		"Content-Type": "application/json",
	}
	var jsonData, err = json.Marshal(request)
	if err != nil {
		fmt.Println(err.Error())
		return events.APIGatewayProxyResponse{StatusCode: http.StatusExpectationFailed}, err
	}
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers:    headers,
		Body:       string(jsonData),
	}, nil
}

func main() {
	lambda.Start(handleLambdaEvent)
}
