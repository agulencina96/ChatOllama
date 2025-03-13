using Microsoft.AspNetCore.Mvc;
using OllamaSharp;

namespace API.Features.Models;

[Route("models/[controller]")]
[ApiController]
public class GetAvailableModels(OllamaApiClient ollamaApiClient) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<GetModelsResponse>> Get()
    {
        try
        {
            var models = await ollamaApiClient.ListLocalModelsAsync();

            var modelsList = models.Select(m => new ModelInfo
            {
                Name = m.Name,
                Size = m.Size,
                Format = m.Details.Format,
                ModifiedAt = m.ModifiedAt,
                QuantizationLevel = m.Details.QuantizationLevel
            }).ToList();

            return Ok(new GetModelsResponse
            {
                Models = modelsList
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error fetching models: {ex.Message}");
        }
    }

    public class GetModelsResponse
    {
        public required List<ModelInfo> Models { get; set; }
    }

    public class ModelInfo
    {
        public required string Name { get; set; }
        public long Size { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string? QuantizationLevel { get; set; }
        public string? Format { get; set; }
    }
}
